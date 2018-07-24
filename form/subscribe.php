<?php
if($_POST)
{
	///////////////// EDITABLE OPTIONS   /////////////////////

	$receiving_email_address 	= "your-email@domain.com";  					// Set your email address here which you want to receive emails to
	
	$subject 					= "New Subscribed User Email"; 					// the subject line of email.
		
	$email_error_msg 			= "Please enter a valid email address!"; 		// error text for email field
			
	$mail_error_msg 			= "Could not send mail! Please check your PHP mail configuration.";		// error text if mail function failed
	
	
	// =============================  DO NOT EDIT BELOW THIS LINE  ======================================
	
    
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        
        $output = json_encode(array( 
            'type'=>'error', 
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); 
    } 
    
    //Sanitize input data using PHP filter_var().
    $email     		= filter_var($_POST["emailSubscribe"], FILTER_SANITIZE_EMAIL);
    
    //additional php validation
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){ 
        $output = json_encode(array('type'=>'error', 'text' => $email_error_msg));
        die($output);
    }
    
    //email body
    $message_body = "A user has submitted a subscribe form on your website.\r\n\r\nBelow are the details:\r\n\r\nEmail: ".$email;
    
    //proceed with PHP email.
    $headers = 'From: '.$email.' <'.$email.'>' . "\r\n" .
    'Reply-To: '.$email.'' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
    
    if ( $_POST['sub-security'] == '' ) {
    
    	$send_mail = mail($receiving_email_address, $subject, $message_body, $headers);
    
    }
    
    
    if(!$send_mail)
    {
        //If something goes wrong, check your PHP email configuration.
        $output = json_encode(array('type'=>'error', 'text' => $mail_error_msg));
        die($output);
    }else{
        $output = json_encode(array('type'=>'success', 'text' => '<h4>Hey!</h4><h6>Your email has been submitted successfully!</h6><p>'.$mail_success_msg.'</p>'));
        die($output);
    }
}
?>