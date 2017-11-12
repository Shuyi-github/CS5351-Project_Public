<?php
	include 'data/common.php';
	include 'data/staffModel.php';
	class loginLogic {
		public $auth = [$AUTHORITY['PUBLIC']];

		function login() {
			$searchModel = new StaffModel();
			$user = $searchModel->findByEmail($_POST['Email']);
		}
	}
?>