import profileImg from '@/assets/images/profile.png';

interface Profile{
  id: number;
  names: string;
  lastNames: string;
  sex: string;
  email: string;
  phone: number;
  photo: string;
  role: number;
  nameRole: string;
  userUID: string;
}
interface Props {
  profile: Profile | null;
  size?: "small" | "big";
}
const small = "h-8 w-8 text-sm font-medium";
const big = "w-24 h-24 order-4 border-border text-2xl font-bold";

const Avatar = ({ profile, size="small" }: Props) => {
  return (
    profile?.photo ? (
      <img
        src={profile?.photo}
        alt={`${profile.names} ${profile.lastNames}`}
        className={`rounded-full object-cover ${size === "small" ? small : big}`}
      />
    ) : (
      <div className={`rounded-full bg-primary text-primary-foreground flex items-center justify-center ${size === "small" ? small : big}`}>
        <img
          src={profileImg}
          alt={`${profile?.names} ${profile?.lastNames}`}
          className={`rounded-full object-cover ${size === "small" ? small : big}`}
        />
      </div>
    )
  )
};

export default Avatar;