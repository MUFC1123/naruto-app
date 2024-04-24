// import React from 'react';
// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import App from './App';
// import axios from 'axios';

// // Axiosのモックを設定
// jest.mock('axios');

// const mockResponse = {
//   data: {
//     characters: [
//       { id: 1, name: 'Naruto Uzumaki', images: ['image1.png'], debut: { appearsIn: 'Anime' }, personal: { affiliation: 'Leaf Village' } },
//       { id: 2, name: 'Sasuke Uchiha', images: ['image2.png'], debut: { appearsIn: 'Manga' }, personal: { affiliation: 'Leaf Village' } }
//     ],
//     total: 50
//   }
// };

// describe('App Component', () => {
//   beforeEach(() => {
//     // モックのリセットと必要な返り値の設定
//     axios.get.mockResolvedValue(mockResponse);
//   });

//   it('renders character cards correctly', async () => {
//     render(<App />);
    
//     await waitFor(() => {
//       expect(screen.getByText('Naruto Uzumaki')).toBeInTheDocument();
//     });

//       expect(screen.getByText('Sasuke Uchiha')).toBeInTheDocument();
//       expect(screen.getByText('Anime')).toBeInTheDocument();
//       expect(screen.getByText('Manga')).toBeInTheDocument();
//       expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'image1.png');
//       expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', 'image2.png');
//     });
//   });

//   it('navigates to next page when Next button is clicked', async () => {
//     render(<App />);

//     const nextButton = screen.getByText('Next');
//     fireEvent.click(nextButton);
    
//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith(expect.anything(), { params: { page: 2, limit: 20 } });
//     });
//   });

//   it('disables the previous button on first page', async () => {
//     render(<App />);
    
//     const prevButton = screen.getByText('Previous');
//     expect(prevButton).toBeDisabled();
//   });

//   it('loads initial characters on render', async () => {
//     render(<App />);

//     await waitFor(() => {
//       expect(axios.get).toHaveBeenCalledWith('https://narutodb.xyz/api/character', { params: { page: 1, limit: 20 } });
//     });
//   });
