<?php
	include 'data/adsModel.php';
	class adsLogic {
		public static function getadsbycampaign() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			if(!Tool::checkParameters(['campaign_id' => 'int'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}

			$ads = AdsModel::findByCampaign($_POST['campaign_id']);
			foreach($ads as $index => $ad) {
				$ads[$index]['Type'] = Config::$ADTYPE[$ad['Type']];
			}
			return $ads;
		}
	}
?>