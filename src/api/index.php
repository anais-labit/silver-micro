<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/text; charset=UTF-8; application/x-www-form-urlencoded');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once '../../vendor/autoload.php';
require_once 'api-config.php';
use App\api\Models\BookingModel;

$bookingModel = new BookingModel;

$api_key = $_SERVER['HTTP_APIKEY'];
$client_ip = $_SERVER['REMOTE_ADDR'];
$allowed_ips = $config['allowed_ips'];
$access_granted = false;
$request_method = $_SERVER['REQUEST_METHOD'];

foreach ($allowed_ips as $allowed_ip) {
    if ($api_key === $config['api_key'] && $client_ip === $allowed_ip) {
        $access_granted = true;
        break;
    }
}

if (!$access_granted) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Accès non autorisé.']);
    exit;
}

switch ($request_method) {

    case 'GET':
        $bookings = $bookingModel->getSiteBookings(1);

        foreach ($bookings as $booking) {

            var_dump($booking);
            
        }

       
        break;

    case 'DELETE': {
        }
        break;

    case 'POST':
        $data = $_POST;
        $user_login = stripslashes($_POST['user_login']);
        $user_nicename = stripslashes($_POST['user_nicename']);
        $user_display_name = stripslashes($_POST['user_display_name']);
        if (
            isset($data['user_login']) &&
            isset($data['user_pass']) &&
            filter_var($data['user_email'], FILTER_VALIDATE_EMAIL)
        ) {
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['message' => 'La méthode n\'est pas autorisée']);
        break;
}
