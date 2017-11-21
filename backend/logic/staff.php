<?php
	include 'data/staffModel.php';
	class staffLogic {
		public static function getallstaff() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			/*if(!Tool::checkAuthorization(Config::$AUTHORITY[''])) {

			}*/

			$staff = StaffModel::findAll();
			$result = [];
			foreach ($staff as $s) {
				$t = [];
				$t['id'] = $s['StaffID'];
				$t['name'] = $s['FirstName'] . ' ' . $s['LastName'];
				$result[] = $t;
			}
			return $result;
		}

		public static function updatepayrate() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			if(!Tool::checkParameters(['staff' => 'not null'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}

			foreach ($_POST['staff'] as $s) {
				if(StaffModel::updateStaffPayrate($s['id'], $s['payrate'])) {
					return ['status' => 1, 'message' => 'Server error'];
				}
			}
			return ['status' => 0, 'message' => 'success'];			
		}
	}
?>