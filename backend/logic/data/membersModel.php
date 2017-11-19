<?php
	class MembersModel {
		public static function tableName() {
			return "members";
		}

		public static function findByStaff($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName()  . " where StaffID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			if($stmt->infect_lines == 1) {
				return [$result->fetch_all(MYSQLI_ASSOC)];
			}
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function findByTeam($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName()  . " where FromTeam = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			if($stmt->infect_lines == 1) {
				return [$result->fetch_all(MYSQLI_ASSOC)];
			}
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function addMenber($team, $type, $staff, $hour) {
			$conn = Tool::getDBConnection();
			$sql = "insert into " . self::tableName() . "(FromTeam, StaffType, StaffID, Hours) values(?, ?, ?, ?);";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('iiii', $team, $type, $staff, $hour);
			$stmt->execute();
			return $stmt->insert_id;
		}

		public static function deleteMember($team, $staff) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where FromTeam = ? and StaffID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('ii', $team, $staff);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function deleteByTeam($team) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where FromTeam = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $team);
			$stmt->execute();
			return $stmt->errno;
		}
	}
?>