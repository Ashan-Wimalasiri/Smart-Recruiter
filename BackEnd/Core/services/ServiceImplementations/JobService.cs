using Domain.Entities;
using Domain.RepositoryInterfaces;
using ServiceInterfaces.IServices;

namespace services.ServiceImplementations;

// Primary constructor used for dependency injection
public class JobService(IJobRepository jobRepository) : IJobService
{
    private readonly IJobRepository _jobRepository = jobRepository;

    public async Task<IEnumerable<Job>> GetAll()
    {
        return await _jobRepository.GetAll();
    }

    public async Task<bool> Update(Job job)
    {
        return await _jobRepository.Update(job);
    }
}