<?php
	class StaffModel extends Model {
		public static function tableName() {
			return "staff";
		}

		public function findByEmail($email) {
			return $this->where('Email = ?', [$email])->limit(1)->execute();
		}
	}
?>