import { store } from '@/redux/store';
import { setAllJobs, setAllAdminJobs, setAllAppliedJobs, setSingleJob } from '@/redux/jobSlice';
import { setCompanies, setSingleCompany } from '@/redux/companySlice';
import { setAllApplicants } from '@/redux/applicationSlice';
import { setUser } from '@/redux/authSlice';

export const clearStore = () => {
    // Clear Redux store
    store.dispatch(setAllJobs([]));
    store.dispatch(setAllAdminJobs([]));
    store.dispatch(setAllAppliedJobs([]));
    store.dispatch(setSingleJob(null));
    store.dispatch(setCompanies([]));
    store.dispatch(setSingleCompany(null));
    store.dispatch(setAllApplicants(null));
    store.dispatch(setUser(null));

    // Clear localStorage
    localStorage.clear();
}; 