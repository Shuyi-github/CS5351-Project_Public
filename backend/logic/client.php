<?php
	include 'data/clientModel.php';
	class clientLogic {
		public static function getallclient() {
			if(!Tool::checkUserStatus()) {
				return ['status' => 1, 'message' => 'Please logon first.'];
			}
			/*if(!Tool::checkAuthorization(Config::$AUTHORITY[''])) {

			}*/

			$client = ClientModel::findAll();
			$result = [];
			foreach ($client as $s) {
				$t = [];
				$t['id'] = $s['ClientID'];
				$t['name'] = $s['Name'];
				$result[] = $t;
			}
			return $result;
		}
	}
?>