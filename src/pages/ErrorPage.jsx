import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error);
    return (
        <div className='text-center flex min-h-screen flex-col justify-center '>
            <h1 className='text-4xl font-bold text-error'>{error.status}</h1>
            <h2 className='text-2xl'>{error.data}</h2>
        </div>
    );
};

export default ErrorPage;