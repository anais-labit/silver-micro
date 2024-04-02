<?php

namespace App\api\Models;

use PDO;
use App\api\Models\DatabaseModel;

class BookingModel
{

    public function connectDb(): PDO
    {
        $conn = new DatabaseModel;
        return $conn->connect();
    }

    // READ
    public function getSiteBookings(int $id_site): ?array
    {
        $query = 'SELECT *
              FROM booking
              WHERE id_site = :id_site
              ORDER BY start DESC';

        $check = $this->connectDb()->prepare($query);
        $check->bindValue(':id_site', $id_site, PDO::PARAM_INT);
        $check->execute();

        $bookings = $check->fetchAll(PDO::FETCH_ASSOC);

        return $bookings;
    }
}
