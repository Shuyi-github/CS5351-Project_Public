<?php
	class testLogic {
		public static function auth() {
			return [$AUTHORITY['PUBLIC']];
		}

		public static function test() {
			$conn = Tool::getDBConnection();
			$sql = "insert into client(Name, Phone, Address, ContactPerson) values(?, ?, ?, ?);";
			$stmt = $conn->prepare($sql);
			if(empty($_POST['client_name']) || empty($_POST['contact_information']) || empty($_POST['client_address'])) {
				return ['status' => 1, 'message' => 'Invalid parameters.'];
			}
			$stmt->bind_param('sssi', $_POST['client_name'], $_POST['contact_information'], $_POST['client_address'], rand(0, 65535));
			$stmt->execute();
			if($conn->errno == 0) {
				return ['status' => 0, 'message' => 'success'];
			} else {
				return ['status' => 1, 'message' => $conn->error_list];
			}
		}

		/*public static function db() {
			$conn = Tool::getDBConnection();
			$sql = "select * from staff;";
			$staff = $conn->query($sql)->fetch_all(MYSQLI_ASSOC);
			foreach($staff as $val) {
				$sql = "update staff set Password = '" . md5($val['Password']) . "' where StaffID = " . $val['StaffID'] . ";";
				$conn->query($sql);
			}
			echo "OK!";
		}*/

		/*public static function power() {
			$conn = Tool::getDBConnection();
			$power = [0 => 777, 1 => 177, 2 => 43, 3 => 23, 4 => 7];
			foreach ($power as $key => $value) {
				$sql = "update authorization set Privilege = " . $value . " where RoleID = " . $key . ";";
				$conn->query($sql);
			}
			echo "OK!";
		}*/
	}
?>