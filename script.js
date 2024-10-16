const totalSeats = 80;
let seatAvailability = Array(totalSeats).fill(true); // True means available, False means reserved
const seatsPerRow = 7;
let reservedSeats = [];

function createSeats() {
    const seatContainer = document.getElementById('seat-container');
    
    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.innerText = i;
        seat.setAttribute('data-seat-id', i);

        if (!seatAvailability[i - 1]) {
            seat.classList.add('reserved'); // If seat is reserved, mark it
        }

        seatContainer.appendChild(seat);
    }
}

// Reserve seats function
function reserveSeats() {
    const seatCount = parseInt(document.getElementById('seat-count').value);

    if (isNaN(seatCount) || seatCount < 1 || seatCount > 7) {
        alert('Please enter a valid number of seats (1-7).');
        return;
    }

    let bookedSeats = [];

    // Try to book within one row first
    for (let row = 0; row < Math.floor((totalSeats - 3) / seatsPerRow); row++) {
        const rowSeats = [];
        for (let seat = 0; seat < seatsPerRow; seat++) {
            const seatId = row * seatsPerRow + seat + 1;
            if (seatAvailability[seatId - 1]) {
                rowSeats.push(seatId);
            }
        }

        // Check if we can reserve the required number of seats in this row
        if (rowSeats.length >= seatCount) {
            bookedSeats = rowSeats.slice(0, seatCount);
            break;
        }
    }

    // Fallback: Book nearby seats if not enough seats are available in a row
    if (bookedSeats.length === 0) {
        for (let i = 0; i < totalSeats; i++) {
            if (seatAvailability[i]) {
                bookedSeats.push(i + 1);
                if (bookedSeats.length === seatCount) {
                    break;
                }
            }
        }
    }

    // Check if we found enough seats
    if (bookedSeats.length < seatCount) {
        alert('Not enough seats available. Try reducing the number of seats.');
        return;
    }

    // Mark the seats as reserved and update the UI
    bookedSeats.forEach(seatId => {
        seatAvailability[seatId - 1] = false;
        const seatElement = document.querySelector(`.seat[data-seat-id="${seatId}"]`);
        seatElement.classList.add('reserved');
    });

    updateMessage(bookedSeats);

    alert(`Successfully reserved seats: ${bookedSeats.join(', ')}.`);
}

// Update the message to display booked seat numbers
function updateMessage(bookedSeats) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = `You have successfully reserved seat(s): ${bookedSeats.join(', ')}.`;
}

// Initial setup
document.addEventListener('DOMContentLoaded', function () {
    createSeats();

    // Attach event listener to the Reserve button
    const reserveButton = document.getElementById('reserve-button');
    reserveButton.addEventListener('click', reserveSeats);
});
