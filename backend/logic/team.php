<?php
	include 'data/teamModel.php';
	include 'data/membersModel.php';
	include 'data/campaignModel.php';
	include 'data/staffModel.php';
	include 'data/authorizationModel.php';
	class teamLogic {
		public static function getteam() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}

			$id = $_SESSION['id'];
			$role = $_SESSION['role'];
			switch($role) {
				case 0:
					$campaign = CampaignModel::findAll();
					break;
				case 1:
					$team = TeamModel::findByManager($id);
					$campaign = [];
					foreach ($team as $t) {
						$c = CampaignModel::findByTeam($t['TeamID']);
						foreach ($c as $cam) {
							$campaign[] = $cam;
						}						
					}
					break;
				default:
					$team = MembersModel::findByStaff($id);
					$campaign = [];
					foreach ($team as $t) {
						$c = CampaignModel::findByTeam($t['FromTeam']);
						foreach ($c as $cam) {
							$campaign[] = $cam;
						}						
					}
					break;
			}

			$result = [];
			foreach ($campaign as $c) {
				$temp = [];
				$temp['teamid'] = $c['AssignedTeam'];
				$temp['cpid'] = $c['CampaignID'];
				$temp['cpname'] = $c['Title'];
				$temp['staff'] = [];
				$member = MembersModel::findByTeam($c['AssignedTeam']);
				foreach ($member as $m) {
					$staff = [];
					$s = StaffModel::findByID($m['StaffID']);
					$staff['staffname'] = $s['FirstName'] . ' ' . $s['LastName'];
					$staff['stafftype'] = AuthorizationModel::findByRoleID($s['Role'])['RoleName'];
					$staff['hours'] = $m['Hours'];
					$temp['staff'][] = $staff;
				}
				$result[] = $temp;
			}
			return $result;
		}
	}
?>