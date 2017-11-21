<?php
	include 'data/staffModel.php';
	include 'data/campaignModel.php';
	include 'data/teamModel.php';
	include 'data/membersModel.php';
	include 'data/clientModel.php';
	include 'data/campnoteModel.php';
	class campaignLogic {
		public static function getcampaign() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}

			switch($_SESSION['role']) {
				case 0:
					$c = CampaignModel::findAll();
					break;
				case 1:
					$team = TeamModel::findByManager($_SESSION['id']);
					$c = [];
					foreach ($team as $t) {
						$cam = CampaignModel::findByTeam($t['TeamID']);
						foreach ($cam as $value) {
							$c[] = $value;
						}						
					}
					break;
				default:
					$fromteam = MembersModel::findByStaff($_SESSION['id']);
					foreach ($fromteam as $m) {
						$team[] = ['TeamID' => $m['FromTeam']];
					}
					$c = [];
					foreach ($team as $t) {
						$cam = CampaignModel::findByTeam($t['TeamID']);
						foreach ($cam as $value) {
							$c[] = $value;
						}						
					}
			}

			$result = [];
			foreach ($c as $cam) {
				$t = [];
				$t['camp_id'] = $cam['CampaignID'];
				$t['camp_name'] = $cam['Title'];
				$t['client'] = ClientModel::findByID($cam['OwnerClient'])['Name'];
				$result[] = $t;
			}
			return $result;
		}

		public static function getcampaignbyid() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			if(!Tool::checkParameters(['request_id' => 'int'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}

			$campaign = CampaignModel::findByID($_POST['request_id']);
			$result = [];
			$result['cn'] = $campaign['Title'];
			$client = ClientModel::findByID($campaign['OwnerClient']);
			$result['cd'] = $client['Name'];
			$result['ccp'] = $client['ContactPerson'];
			$manager = StaffModel::findByID(TeamModel::findByID($campaign['AssignedTeam'])['Manager']);
			$result['am'] = $manager['FirstName'] . ' ' . $manager['LastName'];
			$result['st'] = $campaign['Status'];
			if($campaign['StartDate']) {
				$result['sd'] = date('m/d/Y', $campaign['StartDate']);
			} else {
				$result['sd'] = null;
			}
			if($campaign['EndDate']) {
				$result['ed'] = date('m/d/Y', $campaign['EndDate']);
			} else {
				$result['ed'] = null;
			}			
			$contact = StaffModel::findByID($campaign['ContactPerson']);
			$result['cp'] = $contact['FirstName'] . ' ' . $contact['LastName'];
			$result['cmc'] = $campaign['MaterialCost'];
			$result['ssapc'] = $campaign['SerProdCost'];
			$result['staff'] = [];
			$member = MembersModel::findByTeam($campaign['AssignedTeam']);
			foreach ($member as $m) {
				$t = [];
				$s = StaffModel::findByID($m['StaffID']);
				$t['name'] = $s['FirstName'] . ' ' . $s['LastName'];
				$t['hour'] = $m['Hours'];
				$t['id'] = $s['StaffID'];
				$result['staff'][] = $t;
			}
			return $result;
		}

		public static function updatecampaign() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			if(!Tool::checkParameters(['campaign_id' => 'int', 'cpname' => 'not null', 'status' => 'int', 'contact' => 'int', 'copyright' => 'int', 'ssp' => 'int'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}
			if(!Tool::checkAuthoriation('UPDATE_CAMPAIGN')) {
				return ['status' => 1, 'message' => 'Not authorized.'];
			}
			$campaign = CampaignModel::findByID($_POST['campaign_id']);
			if(empty($campaign)) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}

			if(!empty($_POST['start'])) {
				preg_match("/(\d\d)\/(\d\d)\/(\d\d\d\d)/", $_POST['start'], $date);
				$start = mktime(0, 0, 0, $date[1], $date[2], $date[3]);
			} else {
				$start = null;
			}

			if(!empty($_POST['end'])) {
				preg_match("/(\d\d)\/(\d\d)\/(\d\d\d\d)/", $_POST['end'], $date);
				$end = mktime(0, 0, 0, $date[1], $date[2], $date[3]);
			} else {
				$end = null;
			}

			Tool::getDBConnection()->begin_transaction();
			if(CampaignModel::updatecampaign($_POST['campaign_id'], $_POST['cpname'], $start, $end, 0, $_POST['copyright'], $_POST['ssp'], 0, $_POST['contact'])) {
				Tool::getDBConnection()->rollback();
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			} else {
				if(!isset($_POST['staff'])) {
					Tool::getDBConnection()->commit();
					return ['status' => 0, 'message' => 'success'];
				}
				foreach ($_POST['staff'] as $value) {
					$member = MembersModel::findByTeam($campaign['AssignedTeam']);
					$flag = TRUE;
					foreach ($member as $m) {
						if($m['StaffID'] == $value['id']) {
							$flag = FALSE;
							break;
						}
					}
					if($flag) {
						if(MembersModel::addMenber($campaign['AssignedTeam'], 2, $value['id'], $value['hour'])) {
							Tool::getDBConnection()->rollback();
							return ['status' => 1, 'message' => 'Invalid parameters.'];
						}
						$t = [];
						$t['StaffID'] = $value['id'];
						$member[] = $t;
					}
				}
				Tool::getDBConnection()->commit();
				return ['status' => 0, 'message' => 'success'];
			}
		}

		public static function addcampaign() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			if(!Tool::checkParameters(['campaign' => 'not null', 'client' => 'int'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}

			if(isset($_POST['sdate'])) {
				preg_match("/(\d\d)\/(\d\d)\/(\d\d\d\d)/", $_POST['sdate'], $date);
				$start = mktime(0, 0, 0, $date[1], $date[2], $date[3]);
			} else {
				$start = null;
			}

			if(isset($_POST['edate'])) {
				preg_match("/(\d\d)\/(\d\d)\/(\d\d\d\d)/", $_POST['edate'], $date);
				$end = mktime(0, 0, 0, $date[1], $date[2], $date[3]);
			} else {
				$end = null;
			}			

			Tool::getDBConnection()->begin_transaction();
			$team = TeamModel::addTeam($_SESSION['id']);
			CampaignModel::addCampaign($_POST['client'], $_POST['campaign'], $start, $end, $team);
			Tool::getDBConnection()->commit();
			return ['status' => 0, 'message' => 'success'];
		}

		public static function getnote() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			if(!Tool::checkParameters(['campaign_id' => 'int'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}

			$notes = CampnoteModel::findByCampaign($_POST['campaign_id']);
			$result = [];
			foreach ($notes as $n) {
				$t = [];
				$staff = StaffModel::findByID($n['Poster']);
				$t['name'] = $staff['FirstName'] . ' ' . $staff['LastName'];
				$t['idea'] = $n['Note'];
				$result[] = $t;
			}
			return $result;
		}

		public static function addnote() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			if(!Tool::checkParameters(['campaign_id' => 'int', 'note' => 'not null'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}

			$_POST['note'] = preg_replace('/<.*>/', '', $_POST['note']);

			if(CampnoteModel::addNote($_POST['campaign_id'], $_SESSION['id'], $_POST['note'])) {
				return ['status' => 0, 'message' => 'success'];
			} else {
				return ['status' => 1, 'message' => 'Server error.'];
			}
		}
	}
?>