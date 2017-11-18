<?php
	class CampaignModel {
		public static function tableName() {
			return "campaign";
		}

		public static function findByTeam($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where AssignedTeam = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function findByID($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where CampaignID = ? limit 1;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC)[0];
		}

		public static function findByClient($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where OwnerClient = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function findByStatus($status) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where Status = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $status);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function findByContact($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where ContactPerson = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function addCampaign($client, $title, $start, $end, $team) {
			$conn = Tool::getDBConnection();
			$sql = "insert into " . self::tableName() . "(OwnerClient, Title, StartDate, EndDate, Status, EstimateCost, MaterialCost, SerProdCost, OtherCost, ContactPerson, AssignedTeam) values(?, ?, ?, ?, 0, 0, 0, 0, 0, 0, ?);";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('isii', $client, $start, $end, $team);
			$stmt->execute();
			return $stmt->insert_id;
		}

		public static function updateCampaign($id, $title, $start, $end, $estimate, $material, $ser, $other, $conntact) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName() . " set Title = ?, StartDate = ?, EndDate = ?, EstimateCost = ?, MaterialCost = ?, SerProdCost = ?, OtherCost = ?, ContactPerson = ? where CampaignID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('siiiiiiiii', $title, $start, $end, $estimate, $material, $ser, $other, $conntact, $id);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function finishCampaign($id) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName() . " set Status = 2 where CampaignID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function updateCost($id, $estimate, $material, $ser, $other) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName() . " set EstimateCost = ?, MaterialCost = ?, SerProdCost = ?, OtherCost = ?, where CampaignID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('iiiii', $estimate, $material, $ser, $other, $id);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function deleteCampaign($id) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where CampaignID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return $stmt->errno;
		}
	}
?>