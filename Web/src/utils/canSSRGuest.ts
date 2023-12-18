import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies } from 'nookies';

export function canSSRGuest<p>(fn: GetServerSideProps<p>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<p>> => {

        const cookies = parseCookies(ctx);
        const token = cookies["@barbearia.token"];

        if(cookies["@barbearia.token"]){
            return {
                redirect: {
                    destination: "/dashboard",
                    permanent: false,
                }
            }
        }

        return await fn(ctx);
    }
}