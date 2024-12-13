'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { createServer } from 'miragejs';
import './../globals.css';

interface Car {
    id: number;
    make: string;
    model: string;
    year: number;
    price: string;
    seats: string;
    fuel: string;
    transmission: string;
    location: string;
    distance: string;
    image: string;
}

createServer({
    routes() {
        this.namespace = 'api';

        this.get('/cars', () => [
            {
                id: 1,
                make: 'BMW',
                model: 'M3',
                year: 2019,
                price: '$45,000',
                seats: '5 seats',
                fuel: 'Petrol',
                transmission: '6 Speed Manual',
                location: 'Denver',
                distance: 'ODO: 23,000km',
                image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg',
            },
            {
                id: 2,
                make: 'Land Cruiser',
                model: 'Range Rover',
                year: 2018,
                price: '$61,000',
                seats: '5 seats',
                fuel: 'Diesel',
                transmission: '6 Speed Automatic',
                location: 'Seattle',
                distance: 'ODO: 40,000km',
                image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
            },
            {
                id: 3,
                make: 'Mercedes',
                model: 'S Class',
                year: 2015,
                price: '$34,000',
                seats: '5 seats',
                fuel: 'Petrol',
                transmission: '5 Speed Automatic',
                location: 'San Francisco',
                distance: 'ODO: 37,000km',
                image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg',
            },
            {
                id: 4,
                make: 'Audi',
                model: 'S4 Quatro',
                year: 2018,
                price: '$47,000',
                seats: '5 seats',
                fuel: 'Petrol',
                transmission: '8 Speed Manual',
                location: 'Boston',
                distance: 'ODO: 55,000km',
                image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg',
            },
        ]);
    },
});

const Cars: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/cars');
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const closeModal = () => setSelectedCar(null);

    return (
        <div className="cars-container">
            {cars.map((car) => (
                <motion.div
                    key={car.id}
                    className="car-card"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src={car.image}
                        alt={`${car.make} ${car.model}`}
                        width={300}
                        height={200}
                        className="car-image"
                        onClick={() => setSelectedCar(car)}
                    />
                    <div className="car-details">
                        <h2>{car.make} {car.model}</h2>
                        <div className="car-meta">
                            <span>{car.seats}</span>
                            <span>{car.fuel}</span>
                            <span>{car.transmission}</span>
                        </div>
                        <div className="car-location">
                            <span>{car.location}</span>
                            <span>{car.distance}</span>
                        </div>
                        <div className="car-price">
                            <span>{car.price}</span>
                        </div>
                    </div>
                </motion.div>
            ))}

            {selectedCar && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50" onClick={closeModal}>
                    <motion.div
                        className="bg-gray-800 rounded-lg p-6 text-white max-w-md w-full text-center"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Image src={selectedCar.image}
                               alt={`${selectedCar.make} ${selectedCar.model}`}
                               width={400}
                               height={300}
                               className="rounded-lg mb-4"
                        />
                        <div className="modal-details grid">
                            <h2 className="text-2xl font-bold mb-2">{selectedCar.make} {selectedCar.model}</h2>

                            <div className="grid grid-cols-2 gap-2">
                                <p className="mb-1">Year: {selectedCar.year}</p>
                                <p className="mb-1">Price: {selectedCar.price}</p>
                                <p className="mb-1">Seats: {selectedCar.seats}</p>
                                <p className="mb-1">Fuel: {selectedCar.fuel}</p>
                                <p className="mb-1">Transmission: {selectedCar.transmission}</p>
                                <p className="mb-1">Location: {selectedCar.location}</p>
                                <p className="mb-1">{selectedCar.distance}</p>
                            </div>
                            <button className="modal-close text-white px-6 py-2 rounded text-lg font-bold" onClick={closeModal}>Close</button>
                        </div>
                    </motion.div>
                </div>
            )}

        </div>
    );
};

export default Cars;

