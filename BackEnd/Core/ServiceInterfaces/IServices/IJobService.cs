using Domain.Entities;

namespace ServiceInterfaces.IServices;

public interface IJobService
{
    Task<IEnumerable<Job>> GetAll();
}