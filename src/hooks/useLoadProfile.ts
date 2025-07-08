import { alert } from "@/lib/utils";
import { getPerson, getUser } from "@/services/supabase";
import useAuth from "@/store/AuthStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export function useLoadProfile() {
  const { token, profile, setProfile, setError, setLoading } = useAuth(useShallow((state)=>({
    token: state.token,
    profile: state.profile,
    setProfile: state.setProfile,
    setError: state.setError,
    setLoading: state.setLoading
  })));
  useEffect(() => {
    const fetchProfile = async () => {
      if (profile) return
      setLoading(true);
      setError(null);
      
      try {
        const data = await getUser()
        const user = data?.user
        if (!user) {
          setLoading(false);
          setError("Error loading profile");
          return
        }
        
        const personData = await getPerson(user.id)
        if (Array.isArray(personData) && personData.length > 0) {
          const { roles, ...rest } = personData[0]
          const newData = { ...rest, nameRole: roles?.names }
          setProfile(newData)
          setLoading(false);
          setError(null);
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        setLoading(false);
        setError("Error loading profile");
        alert("Profile","Error loading profile");
      }
    }
    fetchProfile()
  }, [profile, setError, setLoading, setProfile, token])
}
