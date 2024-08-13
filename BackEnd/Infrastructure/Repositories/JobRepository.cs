namespace Infrastructure.Repositories;
using Dapper;
using Domain.Entities;
using Domain.RepositoryInterfaces;
using Infrastructure.DBConnection;

public class JobRepository : IJobRepository
{
    private readonly DBContext _dbConnection;

    public JobRepository(DBContext dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<IEnumerable<Job>> GetAll()
    {
        using var connection = _dbConnection.GetOpenConnection();
        var sql = "SELECT * FROM jobs";
        return (await connection.QueryAsync<Job>(sql)).ToList();
    }
    public async Task<Job> Save(Job job){
        using var connection = _dbConnection.GetOpenConnection();
        var sql = "INSERT INTO jobs (Title, Description, NoOfAvailablePositions, Location, Department, ActiveStatus, " + 
        "AttitudeAndDiscipline, TechnicalKnowledge, EducationBackground, ProfessionalQualification, " +
        "CareerBackground, CommunicationSkills, CulturalFit, FamilyBackground, IQCreativityProblemSolvingSkills, " + 
        "ManagementSkills) VALUES (@Title, @Description, @NoOfAvailablePositions, @Location, @Department, " + 
        "@ActiveStatus, @AttitudeAndDiscipline, @TechnicalKnowledge, @EducationBackground, @ProfessionalQualification, " +  
        "@CareerBackground, @CommunicationSkills, @CulturalFit, @FamilyBackground, @IQCreativityProblemSolvingSkills, " +
        "@ManagementSkills); SELECT CAST(SCOPE_IDENTITY() as int)";

        var id = (await connection.QueryAsync<int>(sql, job)).FirstOrDefault();
        job.Id = id;
        return job;
    }

    public async Task<bool> Update(Job job)
    {
        using var connection = _dbConnection.GetOpenConnection();
        var sql = "UPDATE jobs SET Title = @Title, Description = @Description, NoOfAvailablePositions = @NoOfAvailablePositions, Location = @Location," + 
        "Department = @Department, ActiveStatus = @ActiveStatus, AttitudeAndDiscipline = @AttitudeAndDiscipline," +
        "TechnicalKnowledge = @TechnicalKnowledge, EducationBackground = @EducationBackground," +
        "ProfessionalQualification = @ProfessionalQualification, CareerBackground = @CareerBackground," +
        "CommunicationSkills = @CommunicationSkills, CulturalFit = @CulturalFit, FamilyBackground = @FamilyBackground," +
        "IQCreativityProblemSolvingSkills = @IQCreativityProblemSolvingSkills, ManagementSkills = @ManagementSkills " +
        "WHERE id = @Id";
        return await connection.ExecuteAsync(sql, job) > 0;
    }

    // get job position from jobId
    public async Task<IEnumerable<string>> GetJobPosition(int jobId)
    {
        using var connection = _dbConnection.GetOpenConnection();
        var sql = "SELECT Title FROM jobs WHERE Id = @jobId";
        var position = await connection.QueryAsync<string>(sql, new { jobId });
        return position;
    }
}