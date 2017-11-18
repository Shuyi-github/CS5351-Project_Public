<?php
	include 'data/staffModel.php';
	include 'data/campaignModel.php';
	include 'data/teamModel.php';
	class campaignLogic {
		public static function getcampaign() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 0, 'message' => 'Please logon first.']
			}

			$team = TeamModel::findByManager($_SESSION['id']);
			$fromteam = MembersModel::findByStaff($_SESSION['id']);
			foreach ($manager as $m) {
				$team = array_merge($team, ['TeamID' => $m['FromTeam']]);
			}			

			$result = [];
			foreach ($team as $m) {
				$c = CampaignModel::findByTeam($m['TeamID']);
				$t = [];
				$t['camp_id'] = $c['CampaignID'];
				$t['camp_name'] = $c['Title'];
				$result[] = $t;
			}
			return $result;
		}
	}
?>