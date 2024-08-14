using Domain.Entities;
using Domain.RepositoryInterfaces;
using ServiceInterfaces.IServices;

namespace services.ServiceImplementations;
public class CandidateService : ICandidateService
{
    private readonly ICandidateRepository _CandidateRepository;

    public CandidateService( ICandidateRepository candidateRepository ){
        _CandidateRepository = candidateRepository;
    }


    public async Task<IEnumerable<Candidate>> GetAll()
    {
        return await _CandidateRepository.GetAll();
    }

    public async Task<IEnumerable<CandidateWithComment>> GetApplicantsFromJobId(int jobId)
    {
        return await _CandidateRepository.GetApplicantsFromJobId(jobId);
    }
    public async Task<Candidate> Save(Candidate candidate)
    {
        return await _CandidateRepository.Save(candidate);
    }

    public async Task<bool> UpdateRoleId(int candidateId, int newRoleId)
    {
        return await _CandidateRepository.UpdateRoleId(candidateId, newRoleId);
    }
}