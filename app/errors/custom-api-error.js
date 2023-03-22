// Membuat kelas CustomAPIError sebagai turunan dari kelas Error(Error adalah kelas bawaan JS)
class CustomAPIError extends Error {
  // Membuat constructor dengan parameter message
  constructor(message) {
    // Memanggil constructor dari kelas Error dengan parameter message yang diterima
    super(message);
  }
}

// Menjadikan kelas CustomAPIError dapat diakses dari file JavaScript lain
module.exports = CustomAPIError;
