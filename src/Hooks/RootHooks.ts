import { RootDispatch, Rootstore } from "@/Store/Store";
import { useDispatch, useSelector } from "react-redux";

export const useAppDipatch = useDispatch.withTypes<RootDispatch>()
export const useAppSelector = useSelector.withTypes<Rootstore>()