<?php
	class AdsModel {
		public static function tableName() {
			return "ads";
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

		public static function findByID($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where ID = ? limit 1;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC)[0];
		}

		public static function addAd($campaign, $type, $cost) {
			$conn = Tool::getDBConnection();
			$sql = "insert into " . self::tableName() . "(FromCampaign, Type, Cost) values(?, ?, ?);";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('iii', $campaign, $type, $cost);
			$stmt->execute();
			return $stmt->insert_id;
		}

		public static function deleteAdByID($id) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where ID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function deleteAdByCampaign($id) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where FromCampaign = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function updateAd($id, $type, $cost) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName() . " set Type = ?, Cost = ? where ID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('iii', $type, $cost, $id);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function updateCost($id, $cost) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName() . " set Cost = ? where ID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('ii', $cost, $id);
			$stmt->execute();
			return $stmt->errno;
		}
	}
?>