<?php
if($_POST) {

	///////////////// EDITABLE OPTIONS   /////////////////////

	$receiving_email_address 	= "your-email@domain.com";  					// Set your email address here which you want to receive emails to
	
	$subject 					= "New Contact Form"; 							// the subject line of email.
	
	$name_error_msg 			= "Please enter your name or is too short!"; 	// error text for name field
	
	$email_error_msg 			= "Please enter a valid email address!"; 		// error text for email field
	
	$phone_error_msg 			= "Please enter a valid phone!"; 		// error text for email field
	
	$msg_error_msg 				= "Please enter message."; 						// error text for message field
	
	$mail_success_msg_heading 	= "Your email has been submitted successfully!";	// error text if mail function failed
	
	$mail_success_msg 			= "We'll get back to you as soon as possible.";	// error text if mail function failed
	
	$mail_error_msg 			= "Could not send mail! Please check your PHP mail configuration.";		// error text if mail function failed
	
	
	// =============================  DO NOT EDIT BELOW THIS LINE  ======================================
	
    
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( 
            'type' => 'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); 
    } 
    
    //Sanitize input data using PHP filter_var().
    $name      		= filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    $email     		= filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $phone     		= filter_var($_POST["phone"], FILTER_SANITIZE_STRING);
    $message 		= filter_var($_POST["message"], FILTER_SANITIZE_STRING);
    $domain 		= filter_var($_POST["domain"], FILTER_SANITIZE_STRING);
    
    //additional php validation
    if(strlen($name)<4){ 
        $output = json_encode(array('type'=>'error', 'text' => $name_error_msg));
        die($output);
    }
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){ 
        $output = json_encode(array('type'=>'error', 'text' => $email_error_msg));
        die($output);
    }
    if($phone == ''){ 
        $output = json_encode(array('type'=>'error', 'text' => $phone_error_msg));
        die($output);
    }
    if( !$message ) { 
        $output = json_encode(array('type'=>'error', 'text' => $msg_error_msg));
        die($output);
    }
    
    //email body
    $message_body = "A user has submitted a contact form on your website.\r\n\r\nBelow are the details:\r\n\r\nName: ".$name."\r\n\r\nEmail: ".$email."\r\n\r\nPhone: ".$phone."\r\n\r\nMessage: ".$message."\r\n\r\nDomain: ".$domain;
    
    //proceed with PHP email.
    $headers = 'From: '.$name.' <'.$email.'>' . "\r\n" .
    'Reply-To: '.$email.'' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
    $send_mail = mail($receiving_email_address, $subject, $message_body, $headers);
    
    if(!$send_mail)
    {
        //If something goes wrong, check your PHP email configuration.
        $output = json_encode(array('type'=>'error', 'text' => $mail_error_msg));
        die($output);
    }else{
        $output = json_encode(array('type'=>'success', 'text' => '<h4>Hey, '.$name.'!</h4><h6>'.$mail_success_msg_heading.'</h6><p>'.$mail_success_msg.'</p>'));
        die($output);
    }
}
?>
