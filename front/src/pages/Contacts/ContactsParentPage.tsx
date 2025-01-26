import { Input } from "@material-tailwind/react";
import { ListWithAvatarProf } from "../../components/listeContacts/ListWithAvatarProf";
import { IoSearchOutline } from "react-icons/io5";
import { useContext } from "react";
import { RiWechat2Fill } from "react-icons/ri";
import { ContactInterface } from "../../interfaces/ContactsInterface";
import { getUserContacts } from "../../api/Contacts/contactsFunctions";
import { ListWithAvatarParent } from "../../components/listeContacts/ListWithAvatarParent";
import UserContext from "../../contexts/user.context";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ThemeProviders } from "../../contexts/theme.context";

export default function ContactsParentPage() {
    const { user } = useContext(UserContext);

    const { data: userContacts } = useQuery<ContactInterface>({
        queryKey: ["userContacts"],
        queryFn: () => getUserContacts(user.id),
        staleTime: 0,
        enabled: true,
    });

    return (
        <>
            <ThemeProviders>
                <div className="h-screen ">
                    <h1 className="flex justify-center pt-4 pb-4 text-2xl text-cool-blue font-pop  dark:text-white">
                        Mes contacts
                    </h1>
                    <div className=" h-auto w-full px-2">
                        <Input
                            className="border-2 border-red-700"
                            icon={
                                <IoSearchOutline className="mb-1 size-6 text-cool-blue dark:text-white" />
                            }
                            label="Recherche par email, nom.."
                            crossOrigin={undefined}
                        />
                    </div>

                    <div className="flex items-center mt-4 mb-2 ">
                        <h2 className="ml-6 font-semibold text-cool-blue  dark:text-white font-pop">
                            Enseignants
                        </h2>
                    </div>

                    {userContacts?.isTeacher.map((prof, index: number) => (
                        <div className="flex flex-row justify-between ">
                            <ListWithAvatarProf
                                key={index}
                                userName={`${prof.firstname}  ${prof.lastname}`}
                                nomEcole={prof.schoolName}
                                photo={prof.imgPath}
                            />
                            <button type="button">
                                <Link to={`/chat/${prof.id}`}>
                                    <RiWechat2Fill className="text-4xl m-2 text-cool-blue dark:text-white shadow-cool-blue shadow-sm" />
                                </Link>
                            </button>
                        </div>
                    ))}

                    <h2 className="mt-4 mb-2 ml-6 font-semibold text-cool-blue font-pop  dark:text-white">
                        Parents
                    </h2>

                    {userContacts?.isParent.map((parent, index: number) => (
                        <div className="flex flex-row justify-between">
                            <ListWithAvatarParent
                                key={index}
                                userName={`${parent.firstname}  ${parent.lastname}`}
                                nomEnfant={`${parent.childFirsname}  ${parent.childLastname}`}
                                nomEcole={parent.schoolName}
                                classe={parent.level}
                                photo={parent.imgPath}
                            />
                            <button type="button">
                                <Link to={`/chat/${parent.id}`}>
                                    <RiWechat2Fill className="text-4xl m-2 text-cool-blue  dark:text-white shadow-cool-blue shadow-sm" />
                                </Link>
                            </button>
                        </div>
                    ))}
                </div>
            </ThemeProviders>
        </>
    );
}
