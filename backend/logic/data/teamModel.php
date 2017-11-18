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
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function findByID($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName()  . " where TeamID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function addTeam($manager) {
			$conn = Tool::getDBConnection();
			$sql = "insert into " . self::tableName()  . "(Manager) values(?);";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $manager);
			$stmt->execute();
			$result = $stmt->get_result();
			return $stmt->insert_id;
		}

		public static function updateTeam($id, $manager) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName()  . " set Manager = ?, where TeamID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('ii', $manager, $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $stmt->errno;
		}

		public static function deleteTeam($id) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where TeamID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function deleteTeamByManager($manager) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where Manager = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $manager);
			$stmt->execute();
			return $stmt->errno;
		}
	}
?>