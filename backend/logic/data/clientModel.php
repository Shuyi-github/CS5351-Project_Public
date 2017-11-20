<?php
	class ClientModel {
		public static function tableName() {
			return "client";
		}

		public static function findAll() {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . ";";
			$stmt = $conn->prepare($sql);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public static function findByID($id) {
			$conn = Tool::getDBConnection();
			$sql = "select * from " . self::tableName() . " where ClientID = ? limit 1;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC)[0];
		}

		public static function addClient($name, $phone, $address, $contact) {
			$conn = Tool::getDBConnection();
			$sql = "insert into " . self::tableName() . "(Name, Phone, Address, ContactPerson) values(?, ?, ?, ?);";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('ssss', $name, $phone, $address, $contact);
			$stmt->execute();
			return $stmt->insert_id;
		}

		public static function deleteClient($id) {
			$conn = Tool::getDBConnection();
			$sql = "delete from " . self::tableName() . " where ClientID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return $stmt->errno;
		}

		public static function updateClient($id, $name, $phone, $address, $contact) {
			$conn = Tool::getDBConnection();
			$sql = "update " . self::tableName() . " set Name = ?, Phone = ?, Address = ?, ContactPerson = ? where ClientID = ?;";
			$stmt = $conn->prepare($sql);
			$stmt->bind_param('ssssi', $name, $phone, $address, $contact, $id);
			$stmt->execute();
			return $stmt->errno;
		}
	}
?>