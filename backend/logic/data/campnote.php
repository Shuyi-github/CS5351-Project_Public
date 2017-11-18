<?php
	class CampnoteModel {
		public static function tableName() {
			return "Campnote";
		}

		public static function findByCampaign($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where FromCampaign = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function findByStaff($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where Poster = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function addNote($campaign, $staff, $note) {
			$conn = Tool::getDBConnection();
			$sql = "insert into " . self::tableName() . "(FromCampaign, Poster, Note) values(?, ?, ?);";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('iis', $campaign, $staff, $note);
			$stmt->execute();
			$result = $stmt->get_result();
			return $stmt->insert_id;
		}

		public static function deleteNote($id) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where ID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function deleteNoteByCampaign($id) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where FromCampaign = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return $stmt->errno;
		}
	}
?>