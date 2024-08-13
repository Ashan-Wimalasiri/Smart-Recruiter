using Domain.Entities;

namespace Domain.RepositoryInterfaces;

public interface IJobRepository{
    Task<IEnumerable<Job>> GetAll();
    Task<Job> Save(Job job);
    Task<bool> Update(Job job);
    Task<IEnumerable<string>> GetJobPosition(int jobId);
}
