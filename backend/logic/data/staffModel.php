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
	}
?>