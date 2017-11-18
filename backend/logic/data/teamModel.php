<?php
	class TeamModel {
		public static function tableName() {
			return "team";
		}

		public static function findByManager($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName()  . " where Manager = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC)[0];
		}
	}
?>