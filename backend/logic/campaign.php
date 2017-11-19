<?php
	include 'data/staffModel.php';
	include 'data/campaignModel.php';
	include 'data/teamModel.php';
	include 'data/membersModel.php';
	class campaignLogic {
		public static function getcampaign() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 0, 'message' => 'Please logon first.'];
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
	}
?>