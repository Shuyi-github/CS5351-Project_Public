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

		public static function getadbyid() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			if(!Tool::checkParameters(['ads_id' => 'int'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}

			$ad = AdsModel::findByID($_POST['ads_id']);
			return ['cost' => $ad['Cost']];
		}

		public static function updatead() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			if(!Tool::checkParameters(['ads_id' => 'int', 'type' => 'int', 'cost' => 'int'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}

			if(AdsModel::updateAd($_POST['ads_id'], $_POST['type'], $_POST['cost'])) {
				return ['status' => 1, 'message' => 'Server error.'];
			} else {
				return ['status' => 0, 'message' => 'success'];
			}
		}
	}
?>