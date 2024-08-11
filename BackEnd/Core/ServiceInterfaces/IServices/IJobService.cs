using Domain.Entities;

namespace ServiceInterfaces.IServices;

public interface IJobService
{
    Task<IEnumerable<Job>> GetAll();
    Task<bool> Update(Job job);
    Task<IEnumerable<string>> GetJobPosition(int jobId);
}