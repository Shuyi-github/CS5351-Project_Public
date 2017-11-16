<?php
	include 'data/staffModel.php';
	class loginLogic {
		public static function login() {
			$user = StaffModel::where("email = :email", [":email" => $_POST['username']])->limit(1)->all(MYSQLI_ASSOC);
		}
	}
?>