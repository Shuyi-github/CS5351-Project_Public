<?php
	include 'data/staffModel.php';
	include 'data/campaignModel.php';
	include 'data/teamModel.php';
	include 'data/membersModel.php';
	include 'data/clientModel.php';
	class campaignLogic {
		public static function getcampaign() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}

			$team = TeamModel::findByManager($_SESSION['id']);
			if(empty($team)) {
				$team = [];
			}
			$fromteam = MembersModel::findByStaff($_SESSION['id']);
			foreach ($fromteam as $m) {
				$team[] = ['TeamID' => $m['FromTeam']];
			}

			$result = [];
			foreach ($team as $m) {
				$c = CampaignModel::findByTeam($m['TeamID']);
				foreach ($c as $cam) {
					$t = [];
					$t['camp_id'] = $cam['CampaignID'];
					$t['camp_name'] = $cam['Title'];
					$result[] = $t;
				}
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
			$result['cd'] = ClientModel::findByID($campaign['OwnerClient'])['Name'];
			$manager = StaffModel::findByID(TeamModel::findByID($campaign['AssignedTeam'])['Manager']);
			$result['am'] = $manager['FirstName'] . ' ' . $manager['LastName'];
			$result['st'] = $campaign['Status'];
			$result['sd'] = date('m/d/Y', $campaign['StartDate']);
			$result['ed'] = date('m/d/Y', $campaign['EndDate']);
			$contact = StaffModel::findByID($campaign['ContactPerson']);
			$result['cp'] = $contact['FirstName'] . ' ' . $contact['LastName'];
			$result['cmc'] = $campaign['MaterialCost'];
			$result['ssapc'] = $campaign['SerProdCost'];
			return $result;
		}
	}
?>