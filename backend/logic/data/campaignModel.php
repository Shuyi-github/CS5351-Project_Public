<?php
	class CampaignModel {
		public static function tableName() {
			return "campaign";
		}

		public static function findByTeam($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName()  . " where AssignedTeam = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}
	}
?>