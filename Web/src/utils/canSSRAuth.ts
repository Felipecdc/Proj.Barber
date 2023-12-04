import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';

import { AuthTokenErros } from '../services/errors/AuthTokenErros';

export function canSSRAuth<p>(fn: GetServerSideProps<p>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<p>> => {

        const cookies = parseCookies(ctx)

        const token = cookies["@barbearia.token"];

        if(!token){
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                }
            }
        }

        try{
            return await fn(ctx)
        }catch(err){
            if(err instanceof AuthTokenErros){
                destroyCookie(ctx, "@barbearia.token");
            }
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                }
            }
        }
    }
}