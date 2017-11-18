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
	}
?>