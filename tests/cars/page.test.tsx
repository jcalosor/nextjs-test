import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CarsPage from '../../src/app/cars/page';
import { createServer, Registry, Server} from 'miragejs';
import {afterAll, beforeAll} from "jest-circus";
import {AnyModels, AnyFactories} from 'miragejs/-types';

// Mock MirageJS server
let server: Server<Registry<AnyModels, AnyFactories>>;
beforeAll(() => {
    server = createServer({
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
                }
            ]);
        },
    });
});

afterAll(() => {
    server.shutdown();
});

test('renders car list from API', async () => {
    render(<CarsPage />);

    await waitFor(() => {
        //console.log(screen.getByAltText('BMW M3'));
        expect(screen.getByAltText('BMW M3')).toBeInTheDocument();
       // expect(screen.getByText('$45,000')).toBeInTheDocument();
    });
});