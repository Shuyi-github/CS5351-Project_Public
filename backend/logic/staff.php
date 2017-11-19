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
	}
?>