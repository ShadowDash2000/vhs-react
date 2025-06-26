import NotFoundImg from "@public/careful_scientist.png"
import {Center, Image} from "@chakra-ui/react";

const NotFound = () => {
    return (
        <Center
            height='calc(100vh - 73px)'
        >
            <Image
                src={NotFoundImg}
                alt="404"
                width='20vw'
                title='Страница не найдена'
            />
        </Center>
    )
}

export default NotFound;