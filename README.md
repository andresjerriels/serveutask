# Simple User Authentication with RBAC API
A Simple User Authentication with Role Based Access Control API for ServeU Software Engineering Coding Task, developed with NodeJS, ExpressJS, and MongoDB.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Project ini adalah sebuah REST API Create, Read, Update, Delete (CRUD) User dan User Login yang mengimplementasikan User Authentication sederhana dan menggunakan Role-Based Access Control untuk membatasi akses untuk beberapa fitur dalam API untuk role tertentu. Role yang terdapat dalam API ini yaitu, `user` dan `admin`.

### Built With

* [NodeJS](https://nodejs.org/)
* [ExpressJS](https://expressjs.com)
* [MongoDB](https://www.mongodb.com)



<!-- GETTING STARTED -->
## Getting Started
Untuk menggunakan API ini, anda perlu memastikan Anda sudah menginstal:

* [NodeJS](https://nodejs.org/)
* [ExpressJS](https://expressjs.com)
* [MongoDB](https://www.mongodb.com)
* [Docker](https://www.docker.com)
* [docker-compose](https://docs.docker.com/compose/)

dalam komputer yang Anda gunakan.

### Installation

Setelah meginstal seluruh aplikasi di bagian sebelumnya, untuk menjalankan API, anda dapat mengikuti instruksi berikut:
1. Clone repositori ini
   ```sh
   git clone https://github.com/andresjerriels/serveutask.git
   ```
2. Masuk ke dalam direktori tempat Anda membuat clone API ini, lalu buka terminal (jika menggunakan Mac / Linux) atau Command Prompt (jika menggunakan Windows) dan ketikkan ini ke dalamnya untuk menjalankan API pertama kalinya.
   ```sh
   docker-compose up --build
   ``` 
   Perintah di atas digunakan untuk menginstal seluruh dependencies dan membuild images yang dibutuhkan untuk menjalankan API ini dalam Docker.
3. Sekarang, Anda sudah dapat menggunakan API ini.
4. Setelah selesai menggunakan API ini, jangan lupa untuk memasukkan perintah `docker-compose down` agar tidak terjadi konflik saat ingin memakai API ini selanjutnya.

<!-- USAGE EXAMPLES -->
## Usage
API ini memiliki beberapa fitur, yaitu:
1. Login
2. Get Own Profile
3. Register User (khusus user dengan role admin)
4. Get Specific User (admin dapat melihat keseluruhan data user, sedangkan user biasa hanya dapat melihat username dan role)
5. Get List of All Users (khusus user dengan role admin)
6. Update User Profile (khusus user dengan role admin)
7. Delete User (khusus user dengan role admin)

Penjelasan cara penggunaan tiap fitur/request dapat diakses dalam Documentation, dengan mengakses `http://localhost:3000/api-docs`.

<!-- ADMIN CREDENTIALS -->
## Admin Credentials

Setelah menjalankan API, Anda dapat login sebagai admin dengan credentials berikut:
* username: `admin`
* password: `admin123`

