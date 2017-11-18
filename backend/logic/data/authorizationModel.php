<?php
	class AuthorizationModel {
		public static function tableName() {
			return "authorization";
		}

		public static function findByRoleID($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where RoleID = ? limit 1;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC)[0];
		}
	}
?>