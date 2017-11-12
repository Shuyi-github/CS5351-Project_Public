<?php
	class Model {
		private $dbName;
		private $select;
		private $where;
		private $whereParam;
		private $limit;

		function select($fields) {
			$this->select = $select;
			return $this;
		}

		function where($where) {
			$this->where = $where;
			return $this;
		}

		function where($where, $statement) {
			$this->whereParam = $statement;
			$this->where = $where;
			return $this;
		}

		function limit($limit) {
			$this->limit = $limit;
			return $this;
		}

		function clear() {
			$this->select = null;
			$this->where = null;
			$this->whereParam = null;
			$this->limit = null;
		}

		function execute() {
			$sql = "select ";
			if($this->select == null) {
				$sql = $sql . "* from "
			} else {
				$field = "";
				foreach ($this->select as $aera) {
					$field = ", " . $field . $aera;
				}
				$sql = $sql . substr($sql, 2) . " from ";
			}
			$sql = $sql . $dbName;

			if($this->where) {
				$sql = $sql . "where " . $this->where;
			}

			if($this->limit) {
				$sql = $sql . "limit " . $this->limit;
			}

			$sql = $sql . ";";

			$TOOL->getDBConnection->prepare($sql);
			$TOOL->getDBConnection->bild_param('s', $whereParam);
			$resultSet = $TOOL->getDBConnection->execute();
			$this->clear();
			return $resultSet->fetch_all(MYSQLI_ASSOC);
		}
	}
?>