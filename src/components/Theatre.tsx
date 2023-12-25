import movies from '@/components/data/movies.json';
import Image from 'next/image';
import Masonry from '@mui/lab/Masonry';

interface Movie {
	title: string;
	date_finished: string;
}

export default function Theatre() {
	const moviesArray: Movie[] = Object.entries(movies).map(([key, movie]) => ({
		key,
		...movie,
	}));

	const sortedMovies = moviesArray.sort((a, b) => new Date(b.date_finished || '').getTime() - new Date(a.date_finished || '').getTime());

	return (
        <Masonry
            columns={4}
            spacing={0}
            className="flex items-center pointer-events-none">
            {sortedMovies.map((movie) => (
                <Image key={movie.title} className="p-2" height={1000} width={700} src={`assets/movies/${movie.title}.jpg`} alt={movie.title} />
            ))}
        </Masonry>
	);
}
