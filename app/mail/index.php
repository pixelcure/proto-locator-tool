<?php
	 		
			// Allow from any origin
			if (isset($_SERVER['HTTP_ORIGIN'])) {
			    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
			    header('Access-Control-Allow-Credentials: true');
			    header('Access-Control-Max-Age: 86400');    // cache for 1 day
			}
			// Access-Control headers are received during OPTIONS requests
			if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

			    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
			        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

			    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
			        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

			}

	 		// header('Access-Control-Allow-Origin: *');	
			
			if(!$_GET['email'] || !$_GET['siteName'] || !$_GET['data']){
				
				echo 'Fields not found. Please contact your server adminstator.';
			
				die();
			

			}
			


			// Today's Date
			$date = date("l jS \of F Y h:i:s A");
			
			// Email Contact
			$contact = $_GET['email'];
			
			// Setting header to receive html/text and who it is from
			// To send HTML mail, the Content-type header must be set
			$headers[] = 'MIME-Version: 1.0';
			$headers[] = 'Content-type: text/html; charset=iso-8859-1';
			$headers[] = 'From: ' . $_GET['siteName'] . ' <no-reply@mitraclip.com>';

			// Additional headers
			// $headers[] = 'To: Mary <mary@example.com>, Kelly <kelly@example.com>';
			// $headers[] = 'Cc: birthdayarchive@example.com';
			// $headers[] = 'Bcc: birthdaycheck@example.com';
			
			// Email Subject
			$subject = $_GET['siteName'] . ' TMVR Center Finder';

			// Message to send
			$send = '<html>
						<head>
							<title>The information you requested from TMVR Locator</title>
						</head>
						<body>
							<p>Below is the information for the heart center you selected in your area that offers MitraClip therapy.</p>'
							 . $_GET['data'] . 
							'<p>Thank you!</p>
						</body>
					</html>';

			
			// Take Off!
			ini_set('sendmail_from', 'auto-email-responder');
			
			mail($contact, $subject, $send, implode("\r\n", $headers));			
			
			echo 'Mail Sent';

?>