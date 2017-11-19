<?php
	class StaffModel {
		public static function tableName() {
			return "staff";
		}

		public static function findByEmail($email) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName()  . " where Email = ? limit 1;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('s', $email);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC)[0];
		}

		public static function findByID($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName()  . " where StaffID = ? limit 1;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC)[0];
		}

		public static function findByRole($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName()  . " where Role = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function findAll() {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName()  . ";";
			$stmt = $conn->prepare($sql);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function addStaff($firstname, $lastname, $phone, $email, $password, $pay) {
			$conn = Tool::getDBConnection();
			$sql = "insert into " . self::tableName() . "(FirstName, Lastname, Phone, Email, Password, Payrate, Role) values(?, ?, ?, ?, ?, ?, 2);";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('sssssi', $firstname, $lastname, $phone, $email, $password, $pay);
			$stmt->execute();
			return $stmt->insert_id;
		}

		public static function updateStaff($id, $firstname, $lastname, $phone) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName()  . " set FirstName = ?, Lastname = ?, Phone = ?, where StaffID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('sssi', $firstname, $lastname, $phone, $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $stmt->errno;
		}

		public static function updateStaffRole($id, $role) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName()  . " set Role = ?, where StaffID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('ii', $role, $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $stmt->errno;
		}

		public static function updateStaffPayrate($id, $pay) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName()  . " set Payrate = ?, where StaffID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('ii', $pay, $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $stmt->errno;
		}

		public static function deleteStaff($id) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where StaffID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return $stmt->errno;
		}
	}
?>